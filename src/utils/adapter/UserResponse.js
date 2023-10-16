class UserPermissionResponseAdapter {
    constructor (permissions) {
        permissions =
          permissions &&
          permissions.length && permissions.map((permission) => {
              return {
                  userModule: permission.userModule,
                  add: permission.add,
                  view: permission.view,
                  edit: permission.edit,
                  delete: permission.delete
              }
          })
        this.permissions = permissions
    }
}

class UserResponseAdapter {
    constructor (user) {
        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.mobile = user.mobile
        this.userRoleType = user.userType
        this.roleId = user.userRole
        this.companyOwner = user.parentUser
        this.userPermissions = new UserPermissionResponseAdapter(
            user.userPermission
        ).permissions
    }
}

module.exports = UserResponseAdapter
