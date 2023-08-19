namespace my.ecommerce.auth;

using { cuid, User } from '@sap/cds/common';

using my.ecommerce as ecommerce from './ecommerce';

entity ROLE {
    key ROLE_ID     : String(4);
        DESCRIPTION : String;
}

entity USER {   
    key USER_ID         : String(9);
        EMAIL           : User;
        PASSWORD        : String                 @assert.format: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$'; // Min 1 uppercase letter. Min 1 lowercase letter. Min 1 special character. Min 1 number. Min 8 characters. Max 30 characters. REGEX
        ACTIVE          : Boolean default  true  @readonly;
        ROLE_ID         : Integer default 'R002' @readonly; // DEFAULT R002 - CUSTOMER

        LINK_TO_ROLE    : Association to one ROLE
                               on LINK_TO_ROLE.ROLE_ID = ROLE_ID;
        LINK_TO_PROFILE : Association to one  ecommerce.PROFILE
                               on LINK_TO_PROFILE.EMAIL = EMAIL;
}