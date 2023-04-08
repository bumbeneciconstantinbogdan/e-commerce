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

@(restrict: [
    { grant : ['READ'],                               to : 'CUSTOMER',       },
    { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'   },
])
entity PLC {
    key PLC_ID         : Integer;
        IS_RUNNING     : Boolean;
        PROGRAM_ID     : String;
        INPUT_CARD_ID  : Integer;
        OUTPUT_CARD_ID : Integer;

        LINK_TO_PROGRAM     : Association to one PROGRAM
                            on LINK_TO_PROGRAM.PROGRAM_ID = PROGRAM_ID; 
        LINK_TO_INPUT_CARD  : Association to one  BIT8_CARD_INPUT
                            on LINK_TO_INPUT_CARD.BIT8_CARD_ID = INPUT_CARD_ID;
        LINK_TO_OUTPUT_CARD : Association to one  BIT8_CARD_OUTPUT
                            on LINK_TO_OUTPUT_CARD.BIT8_CARD_ID = OUTPUT_CARD_ID;
}


@(restrict: [
    { grant : ['READ'],                               to : 'CUSTOMER',       },
    { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'   },
])
entity PROGRAM {
    key PROGRAM_ID      : Integer;
        DESCRIPTION     : String;
}

@(restrict: [
    { grant : ['READ','UPDATE'],                      to : 'CUSTOMER'                              },
    { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'                          },
])
entity BIT8_CARD_INPUT {
        key       BIT8_CARD_ID     : Integer;
                  PLC_ID           : Integer;
                  DIO_0            : Boolean;
                  DIO_1            : Boolean;
                  DIO_2            : Boolean;
                  DIO_3            : Boolean;
                  DIO_4            : Boolean;
                  DIO_5            : Boolean;
                  DIO_6            : Boolean;
                  DIO_7            : Boolean;

                  LINK_TO_PLC      : Association to one PLC
                                        on LINK_TO_PLC.PLC_ID = PLC_ID;
}


@(restrict: [
    { grant : ['READ'],                               to : 'CUSTOMER'                              },
    { grant : ['READ', 'UPDATE', 'DELETE', 'CREATE'], to : 'ADMINISTRATOR'                          },
])
entity BIT8_CARD_OUTPUT {
        key       BIT8_CARD_ID     : Integer;
                  PLC_ID           : Integer;
                  DIO_0            : Boolean;
                  DIO_1            : Boolean;
                  DIO_2            : Boolean;
                  DIO_3            : Boolean;
                  DIO_4            : Boolean;
                  DIO_5            : Boolean;
                  DIO_6            : Boolean;
                  DIO_7            : Boolean;

                  LINK_TO_PLC      : Association to one PLC
                                        on LINK_TO_PLC.PLC_ID = PLC_ID;
}