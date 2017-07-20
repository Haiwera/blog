---
layout: post
title:  "Codecep&PHPUnit"
date:   2017-07-19 11:10:35 +0800
tags: test
categories: 读书总结
---
PHPUnit是php单元测试的一个框架，Codeception是基于phpunit写的一个测试套件工具集合，提供除单元测试外的功能测试、Web测试的API，它能快速自动构建单元测试代码，高效地将测试加入到项目中。

<!--break-->

## 安装

- phpunit和codecept都可以通过composer 快速安装 `sebastianbergmann/phpunit`,`Codeception/Codeception`
- codecept安装安成后，会在vendor/bin目录下生成一个文件`vendor/bin/codecept`,phpunit则是`vendor/bin/phpunit`,当然，你也可以全局安装。
- codecept提供了一套快速构建测试代码的命令，我们可以使用`./vendor/bin/codecept bootstrap`来快速生成测试代码的目录结构。如下：

~~~shell

tests/
├── acceptance
│   └── _bootstrap.php
├── acceptance.suite.yml
├── _bootstrap.php
├── _data
│   └── dump.sql
├── _envs
├── functional
│   └── _bootstrap.php
├── functional.suite.yml
├── _output
├── _support
│   ├── AcceptanceTester.php
│   ├── FunctionalTester.php
│   ├── _generated
│   │   ├── AcceptanceTesterActions.php
│   │   ├── FunctionalTesterActions.php
│   │   └── UnitTesterActions.php
│   ├── Helper
│   │   ├── Acceptance.php
│   │   ├── Functional.php
│   │   └── Unit.php
│   └── UnitTester.php
├── unit
│   └── _bootstrap.php
└── unit.suite.yml


~~~

- 默认生成3个测试包(suite)一个单元测试、一个功能测试、一个验收测试。每个包下面都有一个_bootstrap.php和一个yml的配置文件。对于单元测试，_bootstrap.php应当引入项目所需的文件及做一些初始化工作。
- yml文件是codeception的配置文件，根目录下有一个，每个包下面都有一个。它的作用是配置codecept。根目录下的 codeception.yml配置对全局有效，其它的只应用于对应的测试包。

- [Codeception配置说明](http://codeception.com/docs/reference/Configuration)
- [官网](http://codeception.com)

## 集成到项目

- codeception单元测试需要引入一个bootstrap.php的文件，在这个文件中应当引入项目相关的依赖，保证在运行单元测试时执行的代码和在项目运行过程中执行的代码结果一致。这个文件一般要自己编写，以yii为例，我们可以在项目的根目录新建一个`test_bootstrap.php`,内容如下

~~~php
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

$vendor = './vendor';

require     ($vendor . '/autoload.php');
require($vendor . '/yiisoft/yii2/Yii.php');
require(__DIR__ . '/common/config/bootstrap.php');
require(__DIR__ . '/console/config/bootstrap.php');

$config = yii\helpers\ArrayHelper::merge(
    require(__DIR__ . '/common/config/main.php'),
    require(__DIR__ . '/common/config/main-local.php'),
    require(__DIR__ . '/console/config/main.php'),
    require(__DIR__ . '/console/config/main-local.php')
);

$application = new yii\console\Application($config);
$exitCode = $application->init();
~~~

- 然后我们在所需要的`_bootstrap.php`文件中引入这个文件，那么就可以像在项目中调用调用工程中的方法了。

## 生成测试单元测试

~~~shell
# 生成测试单元测试
./vendor/bin/codecept generate:test unit modules/admin/controllers/BaseControllerTest
~~~

- Codeception提供了很多快捷命令，可以使用`./vendor/bin/codecept -h`查看

## 浏览器引入

如果要使用浏览器进行测试，可以修改配置，我们以acceptance验收测试为例,修改tests/acceptance.suite.yml

~~~yml
# 使用PHPBrowser
actor: AcceptanceTester
modules:
    enabled:
        - PhpBrowser:
            url: http://www.example.com/
        - \Helper\Acceptance
# 使用webdriver
class_name: AcceptanceTester
modules:
    enabled:
        - WebDriver:
              url: http://cloud.darcreator.dev
              browser: firefox
        - \Helper\Acceptance


~~~

- 对于PHPBrowser,是使用php curl方式请求来加载页面，不会执行页面的脚本文件。使用webdriver可以驱动浏览器进行测试，如何驱动浏览器工作可以参考[web自动化测试-selenium](http://haiwera.xyz/test-selenium.html)

## 测试编写

### 断言

对于测试核心工作，应当是断言。Codeception继承了phpunit的所有断言，可以参考[PHPunit断言](https://phpunit.de/manual/current/zh_cn/appendixes.assertions.html)

### 执行测试

单个单元测试执行`./vendor/bin/codecept run unit modules/admin/controllers/BaseControllerTest`,也可以不指定文件名表示执行所有的单元测试。
