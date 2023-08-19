using my.ecommerce as ecommerce from '../db/ecommerce';

using my.ecommerce.auth as auth from '../db/auth';


type LoginType {
    sEmail: String;
    sPassword: String;
}

service Ecommerce {

     @(restrict: [
         { grant : ['READ', 'UPDATE', 'CREATE'],           to : 'CUSTOMER'     , where : 'EMAIL = $user' },
         { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'                          },
     ])
     entity Profile as projection on ecommerce.PROFILE;

}

service Auth @(impl: 'srv/auth.js') {

     @(restrict: [
         { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR' },
         { grant : ['READ']                    , to : 'CUSTOMER'      },
     ])
     entity Role    as projection on auth.ROLE;

     @(restrict: [
         { grant : ['READ', 'UPDATE'],           to : 'CUSTOMER'     , where : 'EMAIL = $user' },
         { grant : ['READ', 'UPDATE', 'DELETE'], to : 'ADMINISTRATOR'                          },
         { grant : ['CREATE'],                   to : 'any'                                    } 
     ])
     entity User as projection on auth.USER;

     action regenerateToken(credentials: LoginType) returns String;
}