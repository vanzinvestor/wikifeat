/*
 * Licensed to Wikifeat under one or more contributor license agreements.
 * See the LICENSE.txt file distributed with this work for additional information
 * regarding copyright ownership.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *  Neither the name of Wikifeat nor the names of its contributors may be used
 * to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';
define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.stickit',
    'backbone.radio',
    'bootstrap',
    'text!templates/sidebar/user_menu.html',
    'entities/user/user'
], function($,_,Marionette, Stickit, Radio,
            Bootstrap, UserMenuTemplate, UserModel){

    return Marionette.ItemView.extend({
        id: 'user-menu-view',
        initialize: function(){
            console.log("initializing User Menu View");
        },
        model: UserModel,
        bindings: {
            '#userNameText': {
                observe: 'name'
            }
        },
        events: {
            "click a#accountSettingsLink": "accountSettings",
            "click a#logoutLink": "logout"
        },
        activeMenu: null,

        template: _.template(UserMenuTemplate),

        /* Account Settings Menu */
        accountSettings: function(event){
            event.preventDefault();
            Radio.channel('sidebar').trigger('active:user:accountSettings');
            Radio.channel('user').trigger('user:accountSettings');
        },

        // Sets the account settings link in the sidebar
        setAccountSettings: function(){
            this.activeMenu = "accountSettings";
            var link = $(this.el).find("a#accountSettingsLink")
            if(link){
                this.setLink(link);
            }
        },

        setLink: function(link){
            Radio.channel('sidebar').trigger('active:link', link);
            this.expandMenu();
        },

        expandMenu: function(){
            if(!this.isExpanded()){
                $(this.el).find("div#userSubMenu").addClass("in");
            }
        },

        isExpanded: function(){
            return $(this.el).find("div#userSubMenu").hasClass("in");
        },

        /* Logout the current user */
        logout: function(event){
            event.preventDefault();
            Radio.channel('user').trigger('user:logout');
        },

        /* on render callback */
        onRender: function(){
            if(typeof this.model !== 'undefined') {
                this.stickit();
                this.$("#currentUserThumb").html(this.model.getAvatarThumbnail());
            }
            if(this.activeMenu !== null){
                switch(this.activeMenu){
                    case("accountSettings"):
                        this.setAccountSettings();
                        break;
                }
            }
        },

        onClose: function(){
            this.unstickit();
        }
    });
});
