//0== Test; 1= Production
export let isTesting = 0;

export let ApiURL =
    isTesting === 0
        ? "https://localhost:7255"
        : "";

export let appURL =
    isTesting === 0
        ? ""
        : ""

        export let baseURL =
        isTesting === 0
        ? "/"
        : ""