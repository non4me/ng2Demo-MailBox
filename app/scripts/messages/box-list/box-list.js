(function() {
  'use strict';

  angular.module('myMail')
      .directive('boxList', function() {
        return {
          templateUrl: 'scripts/messages/box-list/box-list.html',
          restrict: 'E',
          replace: true,
          scope: {},
          bindToController: true,
          controller: function(sharedConfig, $stateParams) {
            var vm = this;
            vm.data = sharedConfig;

            vm.data.selectedBoxId = +$stateParams.boxId || 1;

            vm.isSelected = function(id) {
              return vm.data.selectedBoxId === id;
            };

            vm.setSelected = function(boxId) {
              vm.data.selectedBoxId = boxId;
              vm.data.updateMessasgeList();
            };

            vm.getMailCount = function(boxId) {
              var counter = 0;

              angular.forEach(vm.data.messages, function(e) {
                if (e.userId === vm.data.selectedUser.id) {
                  if (e.boxId) {
                    if (e.boxId === boxId) ++counter;
                  }
                  else if (boxId === 1) {
                    ++counter;
                  }
                }
              });

              return counter;
            };
          },
          controllerAs: 'ctrlBoxList'
        };
      });
})();
