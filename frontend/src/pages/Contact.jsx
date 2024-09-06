export function Contact() {
  function handleSubmit() {}

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Message:</label>
        <textarea name="Message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
