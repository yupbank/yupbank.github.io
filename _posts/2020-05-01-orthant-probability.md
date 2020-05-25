---
layout: post
title:  "Orthant Probability of Multi-variate Normal Distribution."
date:   2020-05-08 15:23:54
categories: learning 
---
## Orthant Probability of Multi-variate Normal Distribution.

Orthant Probability is defined as $P(\vec{X}<0)$ where $X \sim N(0, \Sigma)$.
It has been shown that there is no general analytical form of arbitrary dimensional Orthant Probability.

There are a few properties of Orthant Probabilities. 

## Properties of orthant probabilities

### Symmetry:

$P(\vec{X}<0) = P(\vec{X} > 0)$.

One can use the Jacobian matrix and the transformation of C1 diffeomorphism to prove.

### Odd dimension Orthant Probability can always be constructed from lower dimensional marginal probabilities.

One can prove using the axioms of probability and symmetry properties.


## Bi-variate Orthant probabilities.

Define $Y \sim N(0, I)$, $X = G \cdot Y$. It's not easy to see that $X \sim N(0, G \cdot G^T)$.

Using the Normal cone formed by $G$, we can use easily obtain the bi-variate orthant probabilities.

## Tri-variate Orthant probabilities.

### Geometry based solution

We can use the solid angle to calculate the orthant probabilities. And there is a geometry formula for the area of polar spherical triangle.

### Odd dimension construction based solution.

We can construct dimension three results directly from marginal two-dimension results.

## Degenerated Orthant probabilities.

In practice, $\Sigma$ is not necessarily full rank. 
There are numerical solutions for general solutions to solve high-dimensional Gaussian integrals.
And the complexity grows exponentially as the dimension.
Geometry based solution can help to reduce the complexity dramatically.
