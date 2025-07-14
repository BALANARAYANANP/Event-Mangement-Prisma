export type event  = {
    id : string
    title: string
    description: string
    date : Date
    VenueId : string
    
}

export type eventResponse  = {
    id: string
    title: string
    description: string
    date : Date
    createdAt : Date
    updatedAt : Date
    
}[]

export type eventResponseSinlge  = {
    id: string
    title: string
    description: string
    date : Date
    createdAt : Date
    updatedAt : Date
    
}


export type Attendee = {
    name : string
    email: string
}

export type Venue = {
    name : string
    address: string
    capacity : number
}

export type EventAttendee = {
    eventId : string
    attendeeId : string
}

export type Member = {
    Username : string
    password : string 
    role? : string
}


export type LoginMember = {
    Username : string
    password : string
}