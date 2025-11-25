"use server"

export async function explain(prevState, formData) {
    const code = formData.get("code");
    const language = formData.get("language");

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/explain-code`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({code, language}),
        });

        if(!res.ok) {
            return {
                success: false,
                data: {code},
                error: "Failed to fetch explanation. Please try again.",
            }
        }
        const apiData = await res.json();
        return {
            success: true,
            data: {
                ...apiData, 
                code
            }, 
        }
    } catch (error) {
        return {
            success: false,
            data: {code},
            error: `An Error Occurred: ${error?.message}`,
        }
    }
}