'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function() {
              $state.go('home');
            }, function() {
              return;
            }) 
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function() {
              $state.go('home');
            }, function() {
              return;
            }) 
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('home');
            }) 
          },
          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        resolve: {
          channels: function(Channels) {
            return Channels.$loaded();
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).then(function(profile) {
                if(profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('home');
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function () {
    var config = {
      apiKey: "AIzaSyCP1icBr-2AsmG4D8TeoY91ge1pFB3g9K4",
      authDomain: "fireslack-6bdae.firebaseapp.com",
      databaseURL: "https://fireslack-6bdae.firebaseio.com",
      projectId: "fireslack-6bdae",
      storageBucket: "fireslack-6bdae.appspot.com",
      messagingSenderId: "739986151857"
    };
    firebase.initializeApp(config);
  });