namespace my.ecommerce;

using { User } from '@sap/cds/common';

using my.ecommerce.auth as auth  from './auth';

entity PROFILE {
    key EMAIL        : User;
        ADDRESS      : String;
        FIRST_NAME   : String;
        LAST_NAME    : String;
        PHONE        : String;
        PICTURE      : String;

        LINK_TO_USER : Association to one auth.USER
                            on LINK_TO_USER.EMAIL = EMAIL;
}