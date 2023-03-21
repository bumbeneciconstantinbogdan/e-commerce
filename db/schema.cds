namespace my.ecommerce;

using { cuid, User } from '@sap/cds/common';

@(restrict: [
    { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR' },
    { grant : ['READ']                    , to : 'CUSTOMER'      },
])
entity ROLE {
    key ROLE_ID     : Integer;
        DESCRIPTION : String;
}

@(restrict: [
    { grant : ['READ', 'UPDATE'],           to : 'CUSTOMER'     , where : 'EMAIL = $user' },
    { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR'                          },
    { grant : ['CREATE'],                   to : 'any'                                    } 
])
entity USER {
    key USER_ID      : Integer              @readonly;
        EMAIL        : User;
        PASSWORD     : String               @assert.format: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$'; // Min 1 uppercase letter. Min 1 lowercase letter. Min 1 special character. Min 1 number. Min 8 characters. Max 30 characters. REGEX
        ACTIVE       : Boolean default true @readonly;
        ROLE_ID      : Integer default 2    @readonly; // DEFAULT 2 - CUSTOMER

        LINK_TO_ROLE : Association to one ROLE
                           on LINK_TO_ROLE.ROLE_ID = ROLE_ID;
}