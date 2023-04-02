namespace my.ecommerce;

using { cuid, User } from '@sap/cds/common';

@(restrict: [
    { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR' },
    { grant : ['READ']                    , to : 'CUSTOMER'      },
])
entity ROLE {
    key ROLE_ID     : Integer;
        DESCRIPTION : String;

        LINK_TO_ALL_USERS: Association to many  USER on LINK_TO_ALL_USERS.ROLE_ID = ROLE_ID and  DESCRIPTION = 'CUSTOMER';
        LINK_TO_ALL_ADMINISTRATORS: Association to many  USER on LINK_TO_ALL_ADMINISTRATORS.ROLE_ID = ROLE_ID and DESCRIPTION = 'ADMINISTRATOR' ;
}

@(restrict: [
    { grant : ['READ', 'UPDATE'],           to : 'CUSTOMER'     , where : 'EMAIL = $user' },
    { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR'                          },
    { grant : ['CREATE'],                   to : 'any'                                    } 
])
entity USER {   
    key USER_ID         : Integer              @readonly;
        EMAIL           : User;
        PASSWORD        : String               @assert.format: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$'; // Min 1 uppercase letter. Min 1 lowercase letter. Min 1 special character. Min 1 number. Min 8 characters. Max 30 characters. REGEX
        ACTIVE          : Boolean default true @readonly;
        ROLE_ID         : Integer default 2    @readonly; // DEFAULT 2 - CUSTOMER

        LINK_TO_ROLE    : Association to one ROLE
                               on LINK_TO_ROLE.ROLE_ID = ROLE_ID;
        LINK_TO_PROFILE : Association to one  PROFILE
                               on LINK_TO_PROFILE.EMAIL = EMAIL;
}

@(restrict: [
    { grant : ['READ', 'UPDATE', 'CREATE'],           to : 'CUSTOMER'     , where : 'EMAIL = $user' },
    { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'                          },
])
entity PROFILE {
    key EMAIL        : User;
        ADDRESS      : String;
        FIRST_NAME   : String;
        LAST_NAME    : String;
        PHONE        : String;
        PICTURE      : String;

        LINK_TO_USER : Association to one USER
                            on LINK_TO_USER.EMAIL = EMAIL;
}