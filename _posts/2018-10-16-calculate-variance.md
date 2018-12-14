---
layout: post
title:  "Calculate basic statics"
date:   2018-10-16 15:23:54
categories: learning 
---


# How to Calculate Mean

$$\frac{\sum_{i=0}^{n}{x_i}}{n}$$

# How to calculate mean in one pass?

$$sum = \sum_{i=0}^{n}{x_i} \\
count = n $$


# What about variance ?

$$var(x) = \frac{
\sum_{i=0}^{n}{(x_i-\mu)^2}} {n} \\
\mu = \frac{\sum_{i=0}^{n}{x_i}}{n}
$$

# Can we calculate variance in one pass?

$var(x) = \frac{\sum_{i=0}^{n}{x_i^2}}{n} - \mu^2 = E(x^2) - E(x)^2$


# What about covariance ?

$$Cov(X, Y) =  \frac{
\sum_{i=0}^{n}{(x_i-\bar{x})^2*(y_i-\bar{y})^2}} {n} $$

# Can we calculate it in one pass?

$Cov(X, Y) = E(X-E(X))(Y-E(Y)) = E(XY) - E(X)E(Y)$

# However, last equation is prone to catastrophic cancellation when computed with floating point arithmetic 

$$ Cov_n(X, Y) = \frac{C_n}{n} \\

C_n = C_{n-1} + (x_n-\bar{x}_n)(y_n-\bar{y}_{n-1})  \\

\bar{x}_n = \bar{x}_{n-1} + \frac{x_n-\bar{x}_{n-1}}{n} \\

\bar{y}_n = \bar{y}_{n-1} + \frac{y_n-\bar{y}_{n-1}}{n}

$$



