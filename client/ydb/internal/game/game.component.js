angular.module('ydb').directive('game', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/ydb/internal/game/game.html',
        controllerAs: 'game',
        controller: function($scope, $reactive, $state, $stateParams) {

            $reactive(this).attach($scope);

            this.subscribe("games");

            this.gameId = $stateParams.gameId;

            this.helpers({
                currentGame: () => {
                    return Games.findOne(this.gameId);
                }
            });

        }
    }
});