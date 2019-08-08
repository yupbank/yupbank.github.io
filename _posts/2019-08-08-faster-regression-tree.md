---
layout: post
title:  "Faster Regression Tree"
date:   2019-08-08 15:23:54
categories: learning 
---
## Decision Tree Regressor Vectorized.

I just spend a few weeks on vectoizing the greedy depth wise decision tree regression. 

And achieved around two times faster than sklearn's cython implementation, with around the same accuracy.

If you are into decision tree regression, and variance reduction technique, you probably already familar with this equation.

$$
I_{V}(N)={\frac {1}{|S|^{2}}}\sum _{i\in S}\sum _{j\in S}{\frac {1}{2}}(y_{i}-y_{j})^{2}  -({\frac {1}{|S_{l}|^{2}}}\sum _{i\in S_{l}}\sum _{j\in S_{l}}{\frac {1}{2}}(y_{i}-y_{j})^{2} +{\frac {1}{|S_{r}|^{2}}}\sum _{i\in S_{r}}\sum _{j\in S_{r}}{\frac {1}{2}}(y_{i}-y_{j})^{2}).
$$

The splitting criteria want to maximize the difference between variance of the data with weighted sum of variances in the splitted data(left group and right group).

What decision tree regressor does is to greedily try every possible option of split, and pick the best one.

And to make our life easier, we assume all the features/data are numerical. So that for a dataset with shape (N, M). 
There are maximum (N-1)*M splits we need to try.

Before we actually start to split, we want to convert $I_{V}(N)$ into something more friendly with data locality and complexity.

$$
I_{V}(N) = \frac{ (\sum_{i\in S_{l}}{y_i})^2}{|S|*|S_l|} + \frac{ (\sum_{i\in S_{r}}{y_i})^2}{|S|*|S_r|} - (\frac{\sum_{i \in S}{y_i}}{|S|})^2
$$

Now we have better idea on what to calculate. $\sum_{i\in S_{l}}{y_i}$ and $\sum_{i\in S_{r}}{y_i}$. 

```
data_size = X.shape[0] 
total_sum = sum(y)

maximum_reduction = -inf

for feature_i in all the features:
	for (right_y_sum, right_cout), (left_y_sum, right_count) in split_by_feature_i:
		variance_reduction = right_sum**2 /(data_size*right_count) + left_sum**2/(data_size*left_count) - (total_sum/data_size)**2
		if variance_reduction > maxmimum_reduction:
			maxmimum_reduction = variance_reduction

```
And maybe you are smart enough to notice the $(total_sum/data_size)^2$ is static. we can move out of the for loop. only apply that to the maximum value.

And yes, there is two for loops, we should be able to vectorize it. In order to do that, we need to use $right_sums = total_sum-left_sums$ and $right_counts=data_size-left_counts$.
we can have use two matrix with shape [data_size, n_feature] for left_sums, and matrix with shape [data_size, n_feature] for left_counts.
so that 
```
reduction_surrogate = (left_sums)**2/left_counts + (right_sums)**2/right_counts
		    = (left_sums)**2/left_counts + (total_sum-left_sums)**2/(data_size - left_counts)
```
how can we have that key left_sums and left_counts ? since they are correlated. actually if we can use the left_counts to align all the features.
if we try every possible split for one feature_i, (feature_ij <= threshold), we can have data_size -1 chocies.

```
orders = np.argsort(x, axis=0)
left_counts = np.arange(1, data_size, dtype=np.float32)
left_sums = np.cumsum(y[orders], axis=0)
```

We use the relative order to align the sufficient statiscs from different features. 

the best feature and order can be as easy as argmax(reduction_surrogate).  after we locate the splitting information, all that needed is to recursively do the same.

But that is not enough to beat sklearn's cython version. After some profiling. i realize argsort is actually very expensive. if i want to make it faster, i better not sort too many times. 

Actually we already have all the orders. since the order of data by any feature won't change. All we need is to index the true and false mask by our order.
```
left_row_index = orders[:best_threshold_index,best_feature]
bool_mask = np.zeros_like(y, dtype=np.bool)
bool_mask[left_row_index] = True
left_mask = bool_mask[orders]
right_mask = ~bool_mask
left_orders = orders.T[left_mask.T].reshape(-1, num_features).T
right_orders = orders.T[right_mask.T].reshape(-1, num_features).T
```
And use the boolean mask to slice the orders into right and left.

With the two trick, we already have the same speed with sklearn's cythong implementation. after extra profiling. the variance_improvement calculation is still too slow. 

$$
I_{V}(N) = (\sqrt{\frac{1}{|S_l|*(|S|-|S_l|)}}*\sum_{i \in S_l}{y_i} - \sqrt{\frac{1}{|S|-|S_l|}}* \frac{\sum_{i \in S}{y_i}}{|S|})^2
$$

With a final touch. we can further introduce a speed up on the improvement.

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

And now, we are half the speed of sklearn's cython version !!!
