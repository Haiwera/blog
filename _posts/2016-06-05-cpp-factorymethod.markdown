---
layout: post
title:  "C++ 抽象工厂模式简单实现"
date:   2016-06-05 10:27:35 +0800
tags: 设计模式,c++
categories: 设计模式
---

抽象工厂模式是所有形态的工厂模式中最为抽象和最具一般性的一种形态。抽象工厂模式是指当有多个抽象角色时，使用的一种工厂模式。抽象工厂模式可以向客户端提供一个接口，使客户端在不必指定产品的具体的情况下，创建多个产品族中的产品对象。
<!--break-->

根据里氏替换原则，任何接受父类型的地方，都应当能够接受子类型。因此，实际上系统所需要的，仅仅是类型与这些抽象产品角色相同的一些实例，而不是这些抽象产品的实例。换言之，也就是这些抽象产品的具体子类的实例。工厂类负责创建抽象产品的具体子类的实例。


文件结构

~~~shell
├── Creator.hpp				#抽象工厂类
├── Product.hpp				#抽象产品类
├── ConcreteBallCreator.hpp			#实际工厂2
├── ConcreteCreator.hpp			#实际工厂1
├── ConcreteProduct.hpp			#实际产品1
├── ConcreteBall.hpp				#实际产品2
├── ConcreteBall.cpp
├── ConcreteBallCreator.cpp
├── ConcreteCreator.cpp
├── ConcreteProduct.cpp
├── Creator.cpp
├── Product.cpp
└── main.cpp
~~~
Product.hpp

~~~c++
#ifndef __PRODUCT_H__
#define __PRODUCT_H__
#include <string>
using namespace std;

namespace haiwera
{
	class Product{
		public :
			Product();
			virtual void doSomething() = 0;
	};
}

#endif
~~~
Creator.hpp

~~~c++
#ifndef __CREATOR_H__
#define __CREATOR_H__
#include "Product.hpp" 

namespace haiwera
{
	class Creator
	{
		public :
			Creator();
			virtual Product* FactoryMethod() = 0;
	};
}

#endif
~~~
ConcreteBall.hpp

~~~c++
#ifndef __CONCRETEBALL_H__
#define __CONCRETEBALL_H__
#include "Product.hpp"

namespace haiwera
{
	class ConcreteBall : public Product
	{
		public:
			ConcreteBall();
			void doSomething();
	};
}

#endif
~~~
ConcreteBallCreator.hpp

~~~c++
#ifndef __CONCRETEBALLCREATOR_H__
#define __CONCRETEBALLCREATOR_H__

#include "Creator.hpp"
#include "Product.hpp"

namespace haiwera
{
	class ConcreteBallCreator : public Creator
	{
		public:
			ConcreteBallCreator();
			Product* FactoryMethod();
	};
}

#endif
~~~
ConcreteCreator.hpp

~~~c++
#ifndef __CONCRETECREATOR_H__
#define __CONCRETECREATOR_H__
#include "Creator.hpp"
#include "Product.hpp"

namespace haiwera
{
	class ConcreteCreator : public Creator{
		public :
			ConcreteCreator();
			Product* FactoryMethod();

	};
}

#endif
~~~
ConcreteProduct.hpp

~~~c++
#ifndef __CONCRETEPRODUCT_H__
#define __CONCRETEPRODUCT_H__

#include "Product.hpp"

namespace haiwera
{
	class ConcreteProduct : public Product
	{
		public :
			ConcreteProduct();
			void doSomething();
	};
}

#endif
~~~
ConcreteBall.cpp

~~~c++
#include "ConcreteBall.hpp"
#include <iostream>

using namespace std;
using namespace haiwera;

ConcreteBall::ConcreteBall(){

}

void ConcreteBall::doSomething()
{
	cout<<"ConcreteBall do something"<<endl;
}
~~~
ConcreteBallCreator.cpp

~~~c++
#include "ConcreteBallCreator.hpp"
#include "Product.hpp"
#include "ConcreteBall.hpp"

using namespace haiwera;

ConcreteBallCreator::ConcreteBallCreator()
{

}

Product* ConcreteBallCreator::FactoryMethod()
{
	return new ConcreteBall();
}
~~~
ConcreteCreator.cpp

~~~c++
#include "ConcreteCreator.hpp"
#include "ConcreteProduct.hpp"

using namespace std;
using namespace haiwera;

ConcreteCreator::ConcreteCreator()
{

}

Product* ConcreteCreator::FactoryMethod()
{
	return new ConcreteProduct();
}
~~~
ConcreteProduct.cpp

~~~c++
#include "ConcreteProduct.hpp"
#include <iostream>
using namespace std;
using namespace haiwera;

ConcreteProduct::ConcreteProduct()
{

}

void ConcreteProduct::doSomething()
{
	cout<<"ConcreteProduct do something" <<endl;
}
~~~
Creator.cpp

~~~c++
#include "Creator.hpp"

using namespace haiwera;

Creator::Creator()
{

}
~~~
Product.cpp

~~~c++
#include "Product.hpp"

using namespace haiwera;

Product::Product()
{

}
~~~
main.cpp

~~~c++
#include "Creator.hpp"
#include "ConcreteCreator.hpp"
#include "ConcreteBallCreator.hpp"

using namespace haiwera;

int main()
{

	Creator* creat =  new ConcreteCreator();
	Product* prt  = creat->FactoryMethod();
	prt->doSomething();
	creat = new ConcreteBallCreator();
	prt = creat->FactoryMethod();
	prt->doSomething();
	return 0;
}
~~~
创建完这些文件之后，使用autotools工具包中的`autoscan`扫描目录，会生成一个`configure.ac` 的文件，将文件修改为以下内容
configure.ac

~~~shell
AC_PREREQ([2.69])
AC_INIT([factorymethod],[1.0],982220546@qq.com)
AC_CONFIG_SRCDIR([main.cpp])
AC_CONFIG_HEADERS([config.h])
AM_INIT_AUTOMAKE
# Checks for programs.
AC_PROG_CPP
AC_PROG_CXX
# Checks for libraries.

# Checks for header files.

# Checks for typedefs, structures, and compiler characteristics.

# Checks for library functions.

AC_OUTPUT([Makefile])
~~~

将文件更名为`configure.in` 依次执行 `aclocal`;`autoconf`; 会生成`configure` 文件，新建一个 `Makefile.am` 文件，写入以下内容

~~~shell
UTOMAKE_OPTIONS = foreign
bin_PROGRAMS=main
main_SOURCES=ConcreteBall.cpp \
ConcreteCreator.hpp     \   
Product.cpp \
ConcreteBall.hpp        \   
ConcreteProduct.cpp     \   
Product.hpp         \   
ConcreteBallCreator.cpp     \   
ConcreteProduct.hpp     \   
main.cpp \
ConcreteBallCreator.hpp     \   
Creator.cpp     \   
ConcreteCreator.cpp     \   
Creator.hpp
~~~
执行`automake` 会生成 `Makefile` ,然后执行 `./configure` 检测环境 ，通过后执行 `make` 就会生成可执行文件 `main`
