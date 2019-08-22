---
layout: post
title:  "Faster Regression Tree"
date:   2019-08-08 15:23:54
categories: learning 
---
## Decision Tree Regressor Vectorized.

I just spent a few weeks on vectorizing the greedy depth-wise regression tree induction algorithm. 

### [L2 loss reduction]([https://github.com/yupbank/np_decision_tree/blob/a3032df27c74d16e7efd604d15a996a7b512a168/decision_tree/one.py#L52](https://github.com/yupbank/np_decision_tree/blob/a3032df27c74d16e7efd604d15a996a7b512a168/decision_tree/one.py#L52))

If you are into decision tree regression, with variance reduction technique, you probably are already familiar with this equation.

$$
I(S) = \frac{\sum _{i\in S}{(y_i-\bar{y})^2}}{|S|} -( \frac{|S_l|}{|S|} * \frac{\sum _{i\in S_l}{(y_i-\bar{y}_l)^2}}{|S_l|}  + \frac{|S_r|}{|S|} * \frac{\sum _{i\in S_r}{(y_i-\bar{y}_r)^2}}{|S_r|} )
$$

Here $\|S\|$ stands for the size of set $S$. 
The splitting criteria is to maximize the difference between variance of the data $S$ and weighted sum of variances in the left group$S_l$ and right group $S_r$.

And to make our life easier, we assume all the features/data are numerical and unique.

For a dataset $(X, y)$, with $X \in \mathbb{R}^{N\times M}, y\in \mathbb{R}^{N}$.
We define a split as feature that $\leq$ some threshold. There are $M$ features, each one with $N-1$ possible splits. 
From which we can align sufficient statistics from different features by the order of splits.

Before we start to implement, we want to convert $I(S)$ into something more friendly with data locality and complexity.

$$
I(S) = \frac{ (\sum_{i\in S_{l}}{y_i})^2}{|S|*|S_l|} + \frac{ (\sum_{i\in S_{r}}{y_i})^2}{|S|*|S_r|} - (\frac{\sum_{i \in S}{y_i}}{|S|})^2
$$

So that $\sum_{i\in S_{l}}{y_i}$ and $\sum_{i\in S_{r}}{y_i}$ is our suffcient statistics.

```
data_size = X.shape[0] 
total_sum = sum(y)

maximum_reduction = -inf

for feature_i in all the features:
	for (right_y_sum, right_cout), (left_y_sum, right_count) in split_by_feature_i:
		variance_reduction = ( right_sum**2 /(data_size*right_count) 
					+ left_sum**2/(data_size*left_count) 
					- (total_sum/data_size)**2
					)
		if variance_reduction > maxmimum_reduction:
			maxmimum_reduction = variance_reduction

```
And maybe you are smart enough to notice the $(\frac{total\_sum}{data\_size})^2$ is the same with any split choice. 
We can move it out of the for loop. And only apply it to the maximum value.

And yes, there is two for loops, we should try to vectorize it. In order to do so, we can use `right_sums = total_sum-left_sums` and `right_counts=data_size-left_counts`.
With a matrix in shape `[data_size, n_feature]` for left_sums, and a matrix in shape` [data_size, n_feature]` for left_counts.
```
reduction_surrogate = (
                       (left_sums)**2/left_counts 
                     + (right_sums)**2/right_counts
                     )
		    = (
		    (left_sums)**2/left_counts 
		    + (total_sum-left_sums)**2/(data_size-left_counts)
		    + )
orders = np.argsort(x, axis=0)
left_counts = np.arange(1, data_size, dtype=np.float32)
left_sums = np.cumsum(y[orders], axis=0)
```

We use the relative order to align the sufficient statistics from different features. 

To find the best feature and its relative order, we only need to use `argmax(reduction_surrogate)`.  

But that is not faster than sklearn's cython version. After some profiling. i realize `argsort` is very expensive. If i want to make it faster, i better not sort too many times. 

While we already have all the orders. since the order of data by any feature won't change. All we need is to slice the order with boolean mask.
```
left_row_index = orders[:best_threshold_index,best_feature]
bool_mask = np.zeros_like(y, dtype=np.bool)
bool_mask[left_row_index] = True
left_mask = bool_mask[orders]
right_mask = ~bool_mask
left_orders = orders.T[left_mask.T].reshape(-1, num_features).T
right_orders = orders.T[right_mask.T].reshape(-1, num_features).T
```

With the two trick, we already have the same speed with sklearn's cythong implementation. After some extra profiling, the `variance_improvement` calculation is still too slow. 
We can tune the the equation more friendly with vectorization.

$$
I(S) = (\sqrt{\frac{1}{|S_l|*(|S|-|S_l|)}}*\sum_{i \in S_l}{y_i} - \sqrt{\frac{|S_l|}{|S|-|S_l|}}* \frac{\sum_{i \in S}{y_i}}{|S|})^2
$$


```
    n = cumsums.shape[0]
    total_sum = cumsums[-1][-1]
    parent_mean = total_sum/n
    ratio_a = np.sqrt(np.reciprocal(
        np.arange(1, n, dtype=np.float32)*np.arange(n-1, 0, -1, dtype=np.float32)))[:, np.newaxis]
    ratio_b = np.sqrt(np.arange(1, n, dtype=np.float32) /
                      np.arange(n-1, 0, -1, dtype=np.float32))[:, np.newaxis]
    improvements = np.square(ratio_a *
                             cumsums[:-1] - parent_mean * ratio_b)
```

And now, we are twice the speed of sklearn's cython version.

-----

## [L1 loss reduction]([https://github.com/yupbank/np_decision_tree/blob/a3032df27c74d16e7efd604d15a996a7b512a168/decision_tree/strategy_l1.py#L39](https://github.com/yupbank/np_decision_tree/blob/a3032df27c74d16e7efd604d15a996a7b512a168/decision_tree/strategy_l1.py#L39))

Now let's try to implement MAE splitting criteria.  The improvement equation for l1 loss is:
$$
I(S) = \frac{\sum_{i \in S}{|y_i - \tilde{y}|}}{|S|}  -  \frac{|S_l|}{|S|} *\frac{\sum_{i \in S_l}{|y_i - \tilde{y_l}|}}{|S_l|}  -  \frac{|S_r|}{|S|} *\frac{\sum_{i \in S_r}{|y_i - \tilde{y_r}|}}{|S_r|}  \\
$$

But we are smart enough to simplify the equation a little bit.

$$
I(S) = \frac{\sum_{i \in S}{|y_i - \tilde{y}|} - \sum_{i \in S_l}{|y_i - \tilde{y_l}|} -  \sum_{i \in S_r}{|y_i - \tilde{y_r}|}}{|S|}
$$

The sufficient statistics here are $\tilde{y}$ which is median among different side of the split. Which is also different across every split. So in order to vectorize it, we need to find something similar across different split.

There is something connected among one side of the split. 
Let's pick left side for example. With the data sorted among relative orders by one given feature. 
The difference between $S_{l,i}$ and $S_{l,i+1}$ is that $S_{l, i}$ would have one element more than $S_{l,i+1}$. 
For a moment, we use $SS_i =\sum_{j \in S_{l,i}}{|y_j - \tilde{y_{l,i}}|}$  as sufficent statistics represent sum of L1 difference between every element and median element. 
And $y_i$ as the extra element between $S_{l,i}$ and $S_{l,i+1}$.  
This can be treated as inserting $y_i$ to the `i+1` set. 
While $SS_i - SS_{i+1}$  only depends on $y_i$ and $\tilde{y_{l, i}}$.  
Sufficient statics of left side only requires cumulative median of the left side and the extra element of between every two split. 
For the right side, it is very similar, except for not inserting but removing one element at a time.
We can think of splitting a set as from a empty left set and identity right set, we remove one element from right set and insert into left set. 
And the L1 difference of both left and right side only depend on the element picked and median of both original left and right set. 

The way to calculate median for sets with odd number or even number is  a bit different.  
We use the `small_median` and `large_median` to represent median. 
So that regardless of odd or even number of elements, `median = (small_median, large_median)/2`. 
And it is easy to proven, when inserting element $y_i$, 

$$
SS_i - SS_{i+1} = 
\begin{cases}
    small\_median_i - y_i,         & \text{if } y_i \leq small\_median_i\\
        y_i - large\_median_i,         & \text{if } y_i \geq large\_median_i\\
    0,                                & \text{otherwise}
\end{cases}
$$

when removing element $y_i$.

$$
SS_i - SS_{i+1} = 
\begin{cases}
    large\_median_i - y_i,         & \text{if } y_i \leq small\_median_i\\
        y_i - small\_median_i,         & \text{if } y_i \geq large\_median_i\\
    0,                                & \text{otherwise}
\end{cases}
$$

Now we have successfully decomposed the sufficient statistics and shared something between every split. 
Now the only blocker is the cumulative median for both left and right side. 
Not as friendly as the sufficient statistics in L2 loss, which is just sum.   
I have to implement the cumulative median/stream median in python. 
Ironically i can't find anything in any numerical computing lib, but quite a few interview websites. 
I can reuse most of the code from L2 loss, except computing the improvement part. 
