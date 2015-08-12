angular.module('flapperNews', [])
.controller('MainCtrl', [
'$scope',
function($scope){
  // $scope variable serves as the bridge between Angular controllers and templates. 
  $scope.posts = [
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 2},
    {title: 'post 3', upvotes: 15},
    {title: 'post 4', upvotes: 9},
    {title: 'post 5', upvotes: 4}
  ]
  
  // addPost function retrieves the title entered in the form which is bound to the $scope variable 'title'
  $scope.addPost = function(){
    // doesn't allow user to submit a blank post
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link, 
      upvotes: 0});
      $scope.title = '';
      $scope.link = '';
    };
    
  // function to upvote a post  
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}]);

.factory('posts', [function(){
  
}])

