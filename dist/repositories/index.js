"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./audit-log.repository"));
var loopback4_soft_delete_1 = require("loopback4-soft-delete");
exports.SoftCrudRepository = loopback4_soft_delete_1.SoftCrudRepository;
__export(require("./user.repository"));
__export(require("./role.repository"));
__export(require("./tenant.repository"));
__export(require("./user-tenant-permission.repository"));
__export(require("./user-tenant.repository"));
__export(require("./refresh-token.repository"));
__export(require("./auth-client.repository"));
__export(require("./revoked-token.repository"));
__export(require("./user-credentials.repository"));
__export(require("./user-tenant-client.repository"));
__export(require("./group.repository"));
//# sourceMappingURL=index.js.map