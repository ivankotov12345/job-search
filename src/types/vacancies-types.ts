export type VacancyType = {
    id: number,
    profession: string,
    firm_name: string,
    town: {
        title: string,
    },
    type_of_work: {
        title: string,
    },
    payment_from: number,
    payment_to: number,
    vacancyRichText: string,
}