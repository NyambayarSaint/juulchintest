const Named = (stage) => {
    switch (stage) {
        case "verified": return 'Баталгаажсан';
        case 'pending': return 'Төлбөр хүлээгдэж байна';
    }
}

export default Named