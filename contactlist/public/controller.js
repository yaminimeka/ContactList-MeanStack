var my_app=angular
			.module("my_app", [])
			.controller("my_controller",function($scope,$http){


				var refresh = function(){
					$http.get('/contactlist').success(function(data){
					console.log(' i gpt the data from server.js');
					$scope.employees=data;
					$scope.employee='';
				});

				}
				refresh();
				

				$scope.addContact = function(){
					console.log($scope.employee);
					$http.post('/contactlist',$scope.employee).success(function(data){

						console.log(data);
						refresh();
					});
				}

				$scope.delete= function(id){
					console.log(id);
					$http.delete('/contactlist/'+id).success(function(data){
						refresh();

					});
				
				
				}

				$scope.editContact = function (id) {
					$http.get('/contactlist/'+id).success(function (response) {
						$scope.contact = response;




					});

				};

				$scope.updateContact = function (response) {
					console.log($scope.contact._id);
					$http.put('/contactlist/'+$scope.contact._id , $scope.contact).success(function (response) {
						console.log(response);
						refresh();

					});


				};

				$scope.deselect = function () {
					$scope.contact = "";

				}
			});