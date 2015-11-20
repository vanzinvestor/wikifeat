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

/**
 * Created by jcadam on 1/26/15.
 * Base Collection for all Collections
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.paginator'
], function($,_,Backbone,Paginator){

    return Backbone.PageableCollection.extend({

        initialize: function(entityName, model, models, options){
            this.model = model;
            this.entityName = entityName;
            Backbone.PageableCollection.prototype.initialize.call(this, models, options);
        },

        //Parse collection data from hateoas/hal response
        parse: function (response) {
            this.url = response._links.self.href;
            this.isCreatable = response._links.hasOwnProperty('create');
            delete response._links;
            //Paging properties
            this.state.totalRecords = response.total_rows;
            this.state.lastPage = Math.ceil(this.state.totalRecords / this.state.pageSize);
            //this.state.lastPage = this.state.totalPages;
            this.offset = response.offset;
            return response._embedded['ea:' + this.entityName];
        },

        parseRecords: function (resp) {
            return resp._embedded['ea:' + this.entityName];
        },

        setQueryOptions: function (queryOptions){
            for (var property in queryOptions){
                if(queryOptions.hasOwnProperty(property)){
                    this.queryParams[property] = queryOptions[property];
                }
            }
        },

        queryParams: {
            currentPage: "pageNum",
            pageSize: "numPerPage",
            totalRecords: "total_rows",
            forResource: null
        }

    });
});
