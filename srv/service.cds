using {my.ecommerce as my} from '../db/schema';


service Ecommerce {
    entity Role as projection on my.ROLE;
    entity User as projection on my.USER;
}
