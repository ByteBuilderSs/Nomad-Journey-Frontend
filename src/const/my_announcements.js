class announcement{
    constructor(city, country , status) {
        this.city = city;
        this.country = country;
        this.departureDate = "2022/01/01";
        this.arrivalDate = "2022/03/01";
        this.status = status;
    }
}
let my_announcement = [
    new announcement("Paris", "French", "Pending"),
    new announcement("Istanbul", "Turkey", "Accepted"),
    new announcement("Dubai", "UEA", "Expired"),
    new announcement("Ibiza", "Spain", "Done"),
];
export default my_announcement;
