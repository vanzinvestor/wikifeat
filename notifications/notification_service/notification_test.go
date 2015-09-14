/**  Copyright (c) 2014-present James Adam.  All rights reserved.
*
*		 This file is part of Wikifeat.
*
*    Wikifeat is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 2 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package notification_service_test

import (
	"github.com/rhinoman/wikifeat/common/config"
	"github.com/rhinoman/wikifeat/notifications/notification_service"
	"os"
	"testing"
)

var nm = new(notification_service.NotificationManager)

type TemplateData struct {
	To      string
	From    string
	Subject string
	Data    map[string]string
}

func setup() {
	config.LoadDefaults()
	config.Notifications.TemplateDir = "test_templates"
}

func TestLoadTemplate(t *testing.T) {
	setup()
	data := TemplateData{
		To:      "them@otherplace.com",
		From:    "us@ourplace.com",
		Subject: "The Thing",
		Data: map[string]string{
			"user":   "Dude",
			"amount": "Fifty Gazillion",
		},
	}
	//Try the plaintext template
	tmpl, err := nm.LoadPlaintextTemplate("test1")
	if err != nil {
		t.Error(err)
	}
	err = tmpl.Execute(os.Stdout, data)
	if err != nil {
		t.Error(err)
	}
	//Now try the Html Template
	htmpl, err := nm.LoadHtmlTemplate("test1")
	if err != nil {
		t.Error(err)
	}
	err = htmpl.Execute(os.Stdout, data)
	if err != nil {
		t.Error(err)
	}
}