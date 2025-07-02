# friendmatch
基于Vue3+SpringBoot2的移动端网站，实现了用户管理、按标签检索用户、推荐相似用户、组队等功能。
首先进行登录，进行登录页面，输入相关信息，登录成功则进行跳转到主页，主页展示了百万级别的用户，所以进行分页和缓存预热处理，使得加载秒级无需等待很久
![主页](https://github.com/user-attachments/assets/0125a9e9-861c-43ac-ab35-5abd4824d3d4)

心动模式可以根据标签，匹配与当前用户匹配系数较高的用户。并展示在前面

![匹配算法](https://github.com/user-attachments/assets/4fb948dc-38cc-4694-be9d-0a6728d5b24e)

队伍页面展示了一些公开和加密的队伍，并展示其是否可以加入或者解散退出

![加入](https://github.com/user-attachments/assets/e59ac8ed-72a4-427c-99bb-a925d736b9d5)

进入个人页面可以修改个人信息，并同步到后台

![个人主页](https://github.com/user-attachments/assets/0cbda2a4-e7dd-4a98-822a-307a0c9abf09)

创建队伍页面，可以根据描述对队伍信息进行设置使得并进行展示在队伍大厅，需要输入密码的才能进行加入

![QQ截图20250702192933](https://github.com/user-attachments/assets/4b3050c9-7b59-4db6-b501-51c3a7794dbc)

还可以根据标签检索特定用户并展示

![搜索](https://github.com/user-attachments/assets/57e61362-eeee-4e0f-8d29-461902ac7d90)

主要特点

1.对于项目中复杂的集合处理（比如为队伍列表关联已加入队伍的用户），使用Java8StreamAPI和 Lambda表达式来简化编码。

2.为解决首次访问系统的用户主页加载过慢的问题，使用SpringScheduler定时任务来实现缓存预热，并通过分布式锁保证多机部署时定时任务不会重复执行。

3.为解决同一用户重复加入队伍、入队人数超限的问题，使用Redisson分布式锁来实现操作互斥，保证了接口幂等性。

4.使用编辑距离算法实现了根据标签匹配最相似用户的功能，并通过优先队列来减少TOPN运算过花程中的内存占用。

5.自主编写Dockerfile，并通过第三方容器托管平台实现自动化镜像构建及容器部署，提高部署上线效率。

6.使用Knife4j+Swagger自动生成后端接口文档，并通过编写ApiOperation等注解补充接口注释，避免了人工编写维护文档的麻烦。
