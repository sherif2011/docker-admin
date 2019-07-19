"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
class UserModifiableEntity extends base_entity_model_1.BaseEntity {
}
__decorate([
    repository_1.property({
        type: 'number',
        name: 'created_by',
    }),
    __metadata("design:type", Number)
], UserModifiableEntity.prototype, "createdBy", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        name: 'modified_by',
    }),
    __metadata("design:type", Number)
], UserModifiableEntity.prototype, "modifiedBy", void 0);
exports.UserModifiableEntity = UserModifiableEntity;
//# sourceMappingURL=user-modifiable-entity.model.js.map