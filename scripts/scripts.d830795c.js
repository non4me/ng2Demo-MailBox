"use strict";!function(){var a=angular.module("myMail",["ui.router"]);a.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("mailUser",{"abstract":!0,url:"/u/{userId:int}",template:"<main></main>"}).state("mailUser.messages",{url:"/{boxId:int}",template:"<box-list></box-list>"}).state("mailUser.contacts",{url:"/contacts",template:"<contact-list></contact-list>"}),b.otherwise(function(a,b){var c="/u/",d=a.get("apiUser");d.getUserList().then(function(a){var d=a[0].id;b.replace().path(c+d+"/1")})})}])}(),angular.module("myMail").directive("authForm",function(){return{templateUrl:"scripts/_common/auth-form/auth-form.html",restrict:"E",scope:{},controller:function(){this.showLogIn=!0},controllerAs:"ctrlAuthForm"}}),function(){angular.module("myMail").filter("capitalize",function(){return function(a){return a?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():""}})}(),angular.module("myMail").directive("contextLoader",function(){return{templateUrl:"scripts/_common/loader/loader.html",restrict:"E"}}),function(){angular.module("myMail").factory("apiContact",["$q","$http","store",function(a,b,c){function d(){return a(function(a,d){var e=c.getContacts();return e.length?void a(e):void b.get(f).then(function(b){angular.isArray(b.data)&&(c.saveContacts(b.data),a(b.data))})["catch"](function(a){console.warn(a),d(a)})})}function e(d){function e(a,b){return a.filter(function(a){return a.id===b})[0]}function g(a){console.warn(a),reject(a)}return a(function(a,h){var i=c.getContacts();if(i.length){var j=e(i,d);if(angular.isObject(j))return void a(j)}b.get(f).then(function(b){if(angular.isArray(b)){c.saveContacts(b);var f=e(b,d);angular.isObject(f)?a(f):g("Contact not found")}else g("Incorrect server data")})["catch"](function(a){g(a)})})}var f="http://jsonplaceholder.typicode.com/users";return{getContactList:d,getContact:e}}])}(),function(){angular.module("myMail").factory("apiMail",["$q","$http","store",function(a,b,c){function d(d){return a(function(a,e){var f=c.getMessages();if(f.length){var g=h(f,d);if(angular.isArray(g))return void a(g)}b.get(i).then(function(b){if(angular.isArray(b.data)){c.saveMessages(b.data);var f=h(b.data,d);angular.isArray(f)?a(f):e("Messages not found")}else e("Incorrect server data")})["catch"](function(a){e(a)})})}function e(d){return a(function(a,e){var f=c.getMessages();if(f.length){var h=g(f,d);if(angular.isObject(h))return void a(h)}b.get(i).then(function(b){if(angular.isArray(b.data)){c.saveMessages(b.data);var f=g(b.data,d);angular.isObject(f)?a(f):e("Messages not found")}else e("Incorrect server data")})["catch"](function(a){e(a)})})}function f(a){var b=c.getMessages();b.forEach(function(c,d){c.id===a.id&&(delete a.$$hashKey,b[d]=a)}),c.saveMessages(b)}function g(a,b){return a.filter(function(a){return a.id===b})[0]}function h(a,b){return a.filter(function(a){return a.userId===b})}var i="http://jsonplaceholder.typicode.com/posts";return{getUserMessages:d,getMessage:e,saveMessage:f}}])}(),function(){angular.module("myMail").factory("apiUser",["$q","$http","store",function(a,b,c){function d(){return a(function(a,d){var e=c.getUsers();return e.length?void a(e):void b.get(f).then(function(b){angular.isArray(b.data)&&(c.saveUsers(b.data),a(b.data))})["catch"](function(a){console.warn(a),d(a)})})}function e(d){function e(a,b){return a.filter(function(a){return a.id===b})[0]}function g(a){console.warn(a),reject(a)}return a(function(a,h){var i=c.getUsers();if(i.length){var j=e(i,d);if(angular.isObject(j))return void a(j)}b.get(f).then(function(b){if(angular.isArray(b)){c.saveUsers(b);var f=e(b,d);angular.isObject(f)?a(f):g("User not found")}else g("Incorrect server data")})["catch"](function(a){g(a)})})}var f="http://itman.ru/users.json";return{getUserList:d,getUser:e}}])}(),function(){angular.module("myMail").factory("store",["$q","$http",function(a,b){function c(a,b){a&&angular.isArray(b)&&e.setItem(a,JSON.stringify(b))}function d(a){var b=e.getItem(a),c=[];return b&&(c=JSON.parse(b)),c}var e=window.sessionStorage,f="messages",g="contacts",h="users";return{getUsers:function(){return d(h)},saveUsers:function(a){return c(h,a)},getMessages:function(){return d(f)},saveMessages:function(a){return c(f,a)},getContacts:function(){return d(g)},saveContacts:function(a){return c(g,a)}}}])}(),function(){angular.module("myMail").factory("sharedConfig",["apiMail","apiContact",function(a,b){return{boxes:[{id:1,name:"InBox",ico:"save",sort:0},{id:2,name:"Favorites",ico:"star",sort:1},{id:3,name:"Spam",ico:"fire",sort:2},{id:4,name:"Trash",ico:"trash",sort:3}],selectedBoxId:1,messages:[],contacts:[],users:[],selectedMessage:{},selectedUser:{},editProfile:!1,saveMessageState:function(){a.saveMessage(this.selectedMessage)},updateMessasgeList:function(){var b=this;a.getUserMessages(this.selectedUser.id).then(function(a){var c=a.filter(function(a){return 1===b.selectedBoxId?1===a.boxId||!a.boxId:a.boxId===b.selectedBoxId})[0];c&&(c.opened=!0),b.messages=a,b.selectedMessage=c})},updateContactsList:function(){var a=this;b.getContactList().then(function(b){a.contacts=b})}}}])}(),function(){angular.module("myMail").directive("contactList",function(){return{templateUrl:"scripts/contacts/contact-list.html",replace:!0,scope:{},bindToController:!0,controller:["sharedConfig",function(a){this.data=a,this.data.updateContactsList()}],controllerAs:"ctrlContactList"}})}(),function(){angular.module("myMail").directive("main",function(){return{restrict:"E",templateUrl:"scripts/main.html",controller:["$state",function(a){this.currentState=a.current.name,this.setTab=function(b,c){a.go(b,c),this.currentState=b}}],controllerAs:"mainCtrl"}})}(),function(){angular.module("myMail").directive("boxList",function(){return{templateUrl:"scripts/messages/box-list/box-list.html",restrict:"E",replace:!0,scope:{},bindToController:!0,controller:["sharedConfig","$stateParams",function(a,b){var c=this;c.data=a,c.data.selectedBoxId=+b.boxId||1,c.isSelected=function(a){return c.data.selectedBoxId===a},c.setSelected=function(a){c.data.selectedBoxId=a,c.data.updateMessasgeList()},c.getMailCount=function(a){var b=0;return angular.forEach(c.data.messages,function(d){d.userId===c.data.selectedUser.id&&(d.boxId?d.boxId===a&&++b:1===a&&++b)}),b}}],controllerAs:"ctrlBoxList"}})}(),function(){angular.module("myMail").directive("mailList",function(){return{templateUrl:"scripts/messages/mail-list/mail-list.html",replace:!0,scope:{},bindToController:!0,controller:["sharedConfig",function(a){var b=this;this.data=a,this.setSelected=function(c){c.opened=!0,b.data.selectedMessage=c,a.saveMessageState()},this.isSelected=function(a){return b.data.selectedMessage?b.data.selectedMessage.id===a:!1},this.boxFilter=function(a){return 1!==b.data.selectedBoxId||a.boxId&&1!==a.boxId?b.data.selectedBoxId===a.boxId:!0}}],controllerAs:"ctrlMailList"}})}(),function(){angular.module("myMail").directive("mailManager",function(){return{templateUrl:"scripts/messages/mail-list/mail-manager/mail-manager.html",scope:!1,controller:["sharedConfig",function(a){var b=this;b.boxes=a.boxes,b.selectedBoxId=a.selectedBoxId,this.moveToBox=function(b,c){c.stopPropagation(),a.selectedMessage.boxId=b,a.saveMessageState(),a.updateMessasgeList()}}],controllerAs:"CtrlManager"}})}(),angular.module("myMail").run(["$templateCache",function(a){a.put("scripts/_common/auth-form/auth-form.html",'<div class=auth-form ng-if=ctrlAuthForm.showLogIn><div class=backdrop><div class=form-group><input ng-model=login placeholder="Login (admin)"> <input ng-model=password placeholder="Password (admin)"> <button ng-click="doLogin(login, password)">login</button></div></div></div>'),a.put("scripts/_common/loader/loader.html",'<div class="context-loader text-center"><div class=loader><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__ball></div></div><div class=small style="margin: -5px">Loading ...</div></div>'),a.put("scripts/contacts/contact-list.html","<div class=contact-list><div ng-repeat=\"contact in ctrlContactList.data.contacts | orderBy: 'name'\"><div class=contact><span class=contact-name>{{::contact.name }} aka {{::contact.username }}</span><br><span class=contact-email>{{::contact.email }}</span><div class=show-mail ng-show=ctrlContactList.isSelected(message.id)>{{ message.body }}</div></div></div></div>"),a.put("scripts/main.html",'<div class=app><div class="row top"><h1 class="logo zero-margin col-xs-6"><img src=img/logo.png width=50> myMail</h1><div class="user-name col-xs-6 text-right"><user></user></div></div><ul class="nav nav-tabs"><li role=presentation ng-class="{active: mainCtrl.currentState === \'mailUser.messages\'}"><a ng-click="mainCtrl.setTab(\'mailUser.messages\', {boxId:1})">Messages</a></li><li role=presentation ng-class="{active: mainCtrl.currentState === \'mailUser.contacts\'}"><a ng-click="mainCtrl.setTab(\'mailUser.contacts\')">Contacts</a></li></ul><div class="main row zero-margin zero-padding"><ui-view><context-loader></context-loader></ui-view></div></div>'),a.put("scripts/messages/box-list/box-list.html",'<div><div class="box-list col-sm-2 zero-padding"><a class=box-name ng-class="{\'selected\': ctrlBoxList.isSelected(box.id) }" ng-repeat="box in ctrlBoxList.data.boxes | orderBy: \'sort\'" ui-sref={boxId:box.id}><span class="glyphicon glyphicon-{{box.ico}}" style=color:#777></span> <span class=mail-counter>{{ ctrlBoxList.getMailCount(box.id) }}</span> {{ box.name }}</a></div><mail-list class=col-sm-10></mail-list></div>'),a.put("scripts/messages/mail-list/mail-list.html","<div class=mail-list><h2 class=zero-margin>{{ ctrlMailList.data.selectedBox }}</h2><div ng-repeat=\"message in ctrlMailList.data.messages | filter:ctrlMailList.boxFilter | orderBy: 'id'\"><div class=mail ng-class=\"{'selected': ctrlMailList.isSelected(message.id) }\" ng-click=ctrlMailList.setSelected(message)><mail-manager data=ctrlMailList.data></mail-manager><span class=\"mail-ico glyphicon {{message.opened ? 'glyphicon-eye-open' : 'glyphicon-eye-close'}}\"></span> <span class=mail-header>{{ message.title }}</span><div class=show-mail ng-show=ctrlMailList.isSelected(message.id)>{{ message.body }}</div></div></div></div>"),a.put("scripts/messages/mail-list/mail-manager/mail-manager.html",'<div class="mail-manger text-right"><button ng-repeat="box in CtrlManager.boxes" title="Move to {{box.name}}" ng-click="CtrlManager.moveToBox(box.id, $event)" ng-show="CtrlManager.selectedBoxId !== box.id"><span class="glyphicon glyphicon-{{box.ico}}"></span></button></div>'),a.put("scripts/user/user-profile/user-profile.html","<div>Edit user profile<br>Не успел =( <button>Save</button></div>"),a.put("scripts/user/user.html",'<div class="user pull-right"><div class=user-info ng-click="userCtrl.listOpen = !userCtrl.listOpen"><img ng-src={{userCtrl.data.selectedUser.picture.thumbnail}} width="30"> <span class=title>{{userCtrl.data.selectedUser.name.title}}</span>. <span class=name>{{userCtrl.data.selectedUser.name.first | capitalize}} {{userCtrl.data.selectedUser.name.last | capitalize}}</span> <span class="glyphicon {{ userCtrl.listOpen ? \'glyphicon-triangle-bottom\' : \'glyphicon-triangle-left\'}}"></span><div class=users-list ng-show=userCtrl.listOpen><div class=user-in-list ng-repeat="user in userCtrl.data.users | filter:userCtrl.excludeUser" ng-click=userCtrl.selectUser(user)><img ng-src={{user.picture.thumbnail}} width="30"> <span class=title>{{user.name.title}}</span>. <span class=name>{{user.name.first | capitalize}} {{user.name.last | capitalize}}</span></div></div></div></div>')}]),function(){angular.module("myMail").directive("userProfile",function(){return{templateUrl:"scripts/user/user-profile/user-profile.html",restrict:"E",replace:!0,scope:{},controller:["apiMail","sharedConfig",function(a,b){this.data=b,this.isSelected=function(a){return this.data.selectedBoxId===a},this.setSelected=function(a){this.data.selectedBoxId=a}}],controllerAs:"boxList"}})}(),function(){angular.module("myMail").directive("user",function(){return{restrict:"E",replace:!0,templateUrl:"scripts/user/user.html",scope:{},controller:["$state","$stateParams","sharedConfig","apiUser",function(a,b,c,d){var e=this;e.data=c,d.getUserList().then(function(a){e.data.users=a;var c=b.userId||a[0]&&+a[0].id;c&&(e.data.selectedUser=a.filter(function(a){return a.id===c})[0],e.data.updateMessasgeList())}),e.excludeUser=function(a){return a?a.id!==e.data.selectedUser.id:!1},e.selectUser=function(b){b&&a.go("mailUser.messages",{userId:b.id,boxId:1})},e.openProfile=function(a){e.data.editProfile=!0}}],controllerAs:"userCtrl"}})}();