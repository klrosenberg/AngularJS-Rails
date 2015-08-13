angular.module('flapperNews', ['ui.router'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    // configure a home state
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });
    
    $stateProvider
    .state('posts', {
      // id in brackets- route parameter made available in controller
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
    
    $urlRouterProvider.otherwise('home');
}])

.factory('posts', [function(){
  // create new object that has an array 'posts'
  var o = {
    posts: []
  };
  return o
}])

.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    // scope object grabs appropriate post from posts service using $stateParams id
    $scope.post = posts.posts[$stateParams.id];
    
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    }
    // DON'T PUT A ';' IF HAS A 3 BRACKET CLOSURE ON CTRL.
}])

.controller('MainCtrl', [
  '$scope',
  // inject factory service into controller to access data
  'posts',
  function($scope, posts){
    // $scope variable serves as the bridge between Angular controllers and templates.
    // bind $scope.posts variable to post array in the service 
    $scope.posts = posts.posts;
  
    // addPost function retrieves the title entered in the form which is bound to the $scope variable 'title'
    $scope.addPost = function(){
      // doesn't allow user to submit a blank post
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link, 
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]});
        $scope.title = '';
        $scope.link = '';
      };
    
    // function to upvote a post  
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
}]);

