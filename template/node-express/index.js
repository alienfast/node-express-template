// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const handler = require('./function/handler');
const createServer = require('@alienfast/faas/express/createServer')

createServer(handler)
