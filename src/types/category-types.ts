export type CategoryType = {
    title: string,
    title_trimmed: string,
    key: number,
}

export type FilterParamsType = {
    category_key: string | null,
    payment_from: number | '',
    payment_to: number | '',
    no_agreement: number | '',
}