export function getSalary(position: string) {
    switch (position.toLowerCase()) {
        case "estagiário":
            return 1200;
        case "dev":
            return 3100;
        case "tech lead":
            return 5500;
        case "Engineer Manager":
            return 5500;
        case "Product Owner":
            return 4700;
    }
}