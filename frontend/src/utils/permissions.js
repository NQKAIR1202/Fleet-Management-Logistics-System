export const Roles = {

    Admin: "Admin",

    User: "User",

};

export function isAdmin(user){

    return user?.Role==="Admin";

}

export function canEdit(user){

    return isAdmin(user);

}

export function canDelete(user){

    return isAdmin(user);

}

export function canCreate(user){

    return isAdmin(user);

}