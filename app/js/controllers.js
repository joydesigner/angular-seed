/**
 * Created by jzheng on 6/01/2015.
 */
angular.module('myApp.controllers',[])
    .controller('SiteController',function($scope){
            $scope.publisher = 'SitePoint';
            $scope.type = 'Web Development';
            $scope.name="Scope for SiteController";
    })
    .controller('BookController',function($scope){
            $scope.books = ['Jump Start HTML5','Jump Start CSS','Jump Start Responsive Web Design'];
            $scope.name="Scope for BookController";
            $scope.addToWishList = function(book){
              $scope.wishListCount++
            };
            $scope.wishListCount = 0;
            var unbindWatcher = $scope.$watch('wishListCount', function(newValue, oldValue){
                console.log('called '+newValue+' times');
                if(newValue == 2){
                    console.log('Great! You have 2 items in your wish list. ' +
                        'Time to buy what you love. ');
                    unbindWatcher();
                }
            });
    })
    .controller('TimeoutController',function($scope, $timeout){
        $scope.fetchMessage = function(){
            $timeout(function(){
                $scope.message="Fetched after 3 seconds";
                console.log('message='+$scope.message);
            },3000);
        };
    })
    .controller('MessageController', function($scope, $timeout){
        $scope.messages = [{
            sender: 'user1',
            text: "message1"
        }];
        var timer, count;
            count = 0;
        $scope.loadMessages = function(){
            count++;
            $scope.messages.push({
                sender: 'user1',
                text: 'Random message '+count
            });
            timer = $timeout($scope.loadMessages, 2000);
            if(count==3){
                $scope.$broadcast('EVENT_NO_DATA', 'Not connected');
                $timeout.cancel(timer);
            }
        };
        timer = $timeout($scope.loadMessages, 2000);
        $scope.$on('EVENT_RECEIVED', function(){
            console.log('Received emitted event');
        });
    })
    .controller('StatsController',function($scope){
        $scope.name = "World";
        $scope.status = "Connected";
        $scope.statusColor = "green";
        $scope.$on('EVENT_NO_DATA', function(event, data){
            console.log('received broadcasted event');
            $scope.status = data;
            $scope.statusColor = 'red';
            $scope.$emit('EVENT_RECEIVED');
        });
    });
