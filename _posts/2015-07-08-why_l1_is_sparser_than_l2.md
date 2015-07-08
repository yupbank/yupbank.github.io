---
layout: post
title:  "Why L1 is more sparse than L2"
date:   2015-07-08 15:23:54
categories: Machine
---
## Why L1 is more sparse than L2

A few days ago a friend ask me why l1 is sparser than l2.
Which at first i dont have good response to.
After I checked the updated equations carefully.
basically, the regularization term is trying to make the update process(minimize parameter) slower.

In Bayes term, we need to consider our prior knowledge not just evdience.
and essentially, l1 is just a linear function $$ y = x $$
and l2 is $$ y = x^2 $$. $x$ is the input, in our case the parameter. and $y$ is the output which is going to stop the parameter getting smaller or bigger.

lets imagine from the same beginning (equal parameter). the parameter is going to get to zero. 
following the trend defined by l1 and l2. and speed is just the y axis. we can easily see that, the area under l1 and l2 is correlated with how long it takes to get to zero.

![Images of l1 and l2](/miscs/charts.png)

Obviously, the area under l1 is larger than l2, that means l1 is getting much faster to zero.
