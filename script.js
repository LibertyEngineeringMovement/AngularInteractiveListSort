
(
function () {
    'use strict';

    var appid = 'app';

    var app = angular.module(appid, [
    ]);

    var ctrl = app.controller('RefManager', buildRefManager)

    ctrl.$inject = ['$scope'];

    function buildRefManager($scope) {
        var vm = this;
        vm.lists = [];
        vm.selectedList = null;

        vm.addList = addList;
        vm.deleteList = deleteList;
        vm.addDetails = addDetails;
        vm.deleteDetails = deleteDetails;
        vm.changeLineOrder = changeLineOrder;
        vm.updateDetails = updateDetails;

        activate();

        function activate() {
            //Load items

          vm.lists = [{name:'listB',items: []},{name:'list0',items: []},{name:'lista',items: []}];
          vm.lists.sort(function (rowA, rowB) {
              return rowA.name.toLowerCase() < rowB.name.toLowerCase() ? -1
              : rowA.name > rowB.name ? 1
              : 0;
          });

          var len = vm.lists.length;
          if (len > 0) {
              vm.selectedList = vm.lists[0];
          }
          toastr.success('Loaded lookup lists.');
          return;

        }

        function addList() {

            var bContains = vm.lists.findIndex(function (rec) {
                return rec.name === vm.newlist.name;
            });

            if (bContains >= 0) {
                toastr.warning(vm.newlist.name + ' already exists.', 'Duplicate name');
                vm.newlist.name = '';
                return;
            }
            else {
                var rec = {
                    name: vm.newlist.name,
                    date: new Date(),
                    items: [],
                };
                vm.lists.push(rec);
                vm.selectedList = rec;
                vm.newlist.name = '';

                if (rec === undefined) {
                    return;
                }

           }
        }

        function deleteList(list2bRemoved) {
            if (!confirm('Are you sure that you want to delete "' + list2bRemoved.name + '"')) {
                return;
            }
            else {
                if (vm.selectedList.name === list2bRemoved.name) {
                    vm.selectedList = null;
                }

                var ndx = vm.lists.findIndex(function (row) {
                    return list2bRemoved.name === row.name;
                });

                console.log("SHOWMETHEDELETE!", list2bRemoved);
                var msg = list2bRemoved.id;

                vm.lists.splice(ndx, 1);

                if (list2bRemoved === undefined) {
                    return; //Don't delete if it hasn't been used.
                }
                toastr.success('Deleted.');

            }
        }

        function addDetails(rec) {
            var bContains = vm.selectedList.items.findIndex(function (rec) {
                return rec.text === vm.newEntry.text;
            });

            if (bContains >= 0) {
                toastr.warning(vm.newEntry.text + ' already exists.', 'Duplicate name');
                return;
            }
            else {

                vm.newEntry.lineNo = vm.selectedList.items.length + 1;
                vm.newEntry._oln = vm.newEntry.lineNo;
                vm.selectedList.items.push(vm.newEntry);
                vm.newEntry = { text: '', value: '', causeException: false };
            }
        }

        function deleteDetails(rec) {
            var ndx = vm.selectedList.items.findIndex(function (row) {
                return rec.lineNo === row.lineNo;
            });

            vm.selectedList.items.splice(ndx, 1);
            for (var i = 0; i < vm.selectedList.items.length; i++) {
                vm.selectedList.items[i].lineNo = i + 1;
                vm.selectedList.items[i]._oln = i + 1;
            }
        }

        function changeLineOrder(recT) {
            var offset = 0;
            if (recT._oln === undefined || recT === null)
            {
                recT._oln = recT.lineNo;
            }
            else
            {
                if (recT._oln < recT.lineNo) {
                    offset = 0.5;
                }
                else if (recT._oln > recT.lineNo){
                    offset = - 0.5;
                }
            }
            recT.lineNo += offset;

            vm.selectedList.items.sort(function (recA, recB) {

                var ret = 0;

                ret = (recA.lineNo < recB.lineNo) ? -1
                    : ((recA.lineNo > recB.lineNo) ? 1
                    : 0);


                return ret;
            });

            for (var i = 0; i < vm.selectedList.items.length; i++)
            {
                vm.selectedList.items[i].lineNo = i + 1;
                vm.selectedList.items[i]._oln = i + 1;
            }
        }

        function updateDetails(rec) {
            if (rec === undefined) {
                return;
            }
            var idx = vm.lists.findIndex(function (row) {
                return row.name === rec.name;
            });

            toastr.info('Dummy function for placeholder.');
        }
    }
}
)();
