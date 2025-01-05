module.exports = (url) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Hello!</h2>
            <p style="color: #555;">You have a new link to check out:</p>
            <a href="${url}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Click Here</a>
            <p style="color: #555;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
            <p style="color: #007bff;">${url}</p>
            <p style="color: #555;">Best regards, <br> The PrepDSA Team</p>
        </div>
    `;
}
