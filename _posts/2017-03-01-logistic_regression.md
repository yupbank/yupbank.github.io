---
layout: post
title:  "Logistic Regression Notes"
date:  2017-03-02 13:53:35
categories: learning 
---



# Loss Functions

- Cross Entropy
	- Entropy: $$ H(p) = -\sum_{i=1}^{n}p(x_i)log_bp(x_i) $$ 
	- Cross Entropy $$H(p, q) = E_p[-log(q)] = H(p) + D_{KL}(p||q)$$
	- With discrete p and q: $H(p, q) = -\sum_xp(x) log(q(x))$       


# Logistic Regression

- Two common way to model logistic regression
	- $f_{1}(x) = w_1* x$
	- $f_{2}(x) = \frac{1}{1+e^{-w_2*x}}$

- With corresponding loss functions.
	- logistic loss: $L_1(y, f_1(\vec{x})) = ln(1+ e^{-y*f_{1}(\vec{x})})$ 
		- here $y\in \{+1, -1\}$
	- cross entropy loss: $L_2(y, f_2(x)) = -yln(f_{2}(x)) -  (1-y)ln(1-f_{2}(x))$ 
		- here $y \in \{0, 1\}$
    
- Gradients for each
    - gradient for logistic loss:

	$$
		\frac{\partial{L_1}}{\partial{w}} =  x^T * \frac{1}{1+e^{-y*f_1(x)}}*e^{-y*f_1(x)}*-y \\
			= x^T * y(\frac{1}{1+e^{-y*f_1(x)}} - 1)
	$$ 
    - gradient for cross entropy loss:
    	$$ 
	\frac{\partial{L_2}}{\partial{w}} = X^T*\{-y*\frac{f_2(x)*(1-f_2(x)}{f_2(x)} - (1-y)*\frac{-1*f_2(x)*(1-f_2(x))}{1 - f_2(x)}\} = X^T*(f_2(x)-y) 
	$$

- Hessians for each
	- hessian for logistic loss:
	$$
			\frac{\partial^2{L_1}}{\partial{w}} =  x^T * y * \{ \frac{1}{1+e^{-y*f_1(x)}}*(1-\frac{1}{1+e^{-y*f_1(x)}})*(-yx) \}
				$$
	- hessian for cross entropy loss:
		$$ 
				\frac{\partial^2{L_2}}{\partial{w}}  = x^T*\{f_2(x)*(1- f_2(x))\} * x
					$$
