---
layout: post
title:  "Decision Tree Variance Approximation"
date:   2018-12-14 15:23:54
categories: fun
---

## To patch or not to patch.

Our daily life is being affected by open source projects quite a lot. And it's quite a fun experience, until you run into some problems. Nowadays a typical median sized company would utilize thousands of open source projects. Which means they don't have their own verison of all the open source projects trivially. Even if they find out a problem with certain project and contribute a patch, it usually takes a lot of time for the open source community to adopt it and release it.

So sometimes it's important to fix the bug by using approximation.

## The bug or (feature request)

If you are familiar with random forest regression. And there is a tensorflow implementation of it. Which there is also a bug in it. 
For a given prediction, we want to have the variance of them.

The variance need to be calculated between trees and within trees.

$$
var(Forest(X)) = var([Tree_1(x), Tree_2(x)]) + mean([var(Tree_1), var(Tree_2)])
$$

or put into real math

$$
 \operatorname {Var} [Y] =\operatorname {E} [\operatorname {Var} [Y\mid X]]+\operatorname {Var} [\operatorname {E} [Y\mid X]]
$$

But tensor_forest forget to export the variance of every leaf of the trees $Var(E(Y|X))$. In that case we need to fix it.

But the fix requires some kernel changes, which we need to wait for the upstream to merge and release.

But we can fix it by using approximation!


## Approximate variances of decision tree leaves using a second decision tree.

### Now let's focus on only one tree.

Given input X, we would partiton it through the tree into a leaf, and the leaf would contain a vector/scalar which would be the prediction Y.

$$
Var(Y) = E(Y^2) - E(Y)^2
$$

Which $E(Y)$ is the prediction. But $E(Y^2)$ is missing.

Well if we train a tree with data (X, Y) the leaf vector would be $E(Y)$. Why don't we train a second tree with data (X, Y^2), so the new tree would give me prediction of E(Y^2). which would be end of story.

But then no, i need to gurantee the second tree have the same structure with the first tree.

How can i do that?  Well the nice thing of make sure tree structure is that you only need to make sure one split cretiria matches, the result would be take care of using recusive's nature.

The splitting criteria is actually very simple $Y_f = argmax{Var(Y_1), Var(Y_2), Var(Y_3)}$ So that if we use $Y^2$ then spliting would be $Y_s = argmax{Var(Y_1^2), Var(Y_2^2), Var(Y_3^2)}$.

While $Y_f$ doesn't not equal to $Y_s$, the tree structure would change. But we can take some inspiration from it. We need to find a function g, such that `Var(g(x))` is monotonic,  so that our new tree would maintain the same structure.

While `g` also need to be able to recover $Y^2$ since that's our final goal.

## Taylor expansion into the rescue.

We can first expand a expecation.

$$
E(f(x)) = E(f(\mu) + f(\mu)^{`}*(x-\mu) + f(\mu)^{``}*(x-\mu)^2 + O(3)
$$

Then we can expand the variance.

$$
Var(f(x)) = E((f(x) - E(f(x)))^2) 
$$

Subsititue the first one and a lot of deduction, we get

$$
Var(f(x)) \approx f^{`}(E(x))^2 * Var(x)
$$

nice, so we can have

$$
Var(x^2) \approx 4*E(x)^2 * Var(x)
$$

Now we can have a monotonical transformation, 

which means train a second decision tree on this dataset (X, Y^2/E(Y)) would give us the approximately the same structure!

Where E(Y) is just the prediction from the first tree.

And our second tree would give us a prediction E(Y^2/E(Y)).



## Have our variance back !

$$
Var(Y) = E(Y^2/E(Y)) * E(Y) - E(Y) * E(Y)
$$

Where E(Y) is the prediction provided by the first tree, and E(Y^2/E(Y)) is the prediction provided by the second tree.

