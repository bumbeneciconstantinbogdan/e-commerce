using {my.ecommerce as my} from '../db/schema';

service Ecommerce {
    entity Role           as projection on my.ROLE;
    entity User           as projection on my.USER;
    entity Profile        as projection on my.PROFILE;
    entity PLC            as projection on my.PLC;
    entity Bit8CardInput  as projection on my.BIT8_CARD_INPUT;
    entity Bit8CardOutput as projection on my.BIT8_CARD_OUTPUT;
    entity Program        as projection on my.PROGRAM;

    action login(EMAIL : String, PASSWORD : String) returns String;
    action reset();
}
