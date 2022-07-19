export const cpfValidator = (cpf: string): boolean => {

    let cleanedCpf = cpf.replace(/\D+/g, '')
    let isCpfLength = cleanedCpf.length === 11;

    if (!isCpfLength) {
        return false;
    }

    let numbersSumValidator = cleanedCpf.split('').reduce((prev, curr) => {
        return (parseInt(prev) + parseInt(curr)).toString();
    })

    const [first, second] = numbersSumValidator.toString().split('');
    if (first != second) {
        return false;
    }

    return true;
}