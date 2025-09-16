import jwt from "jsonwebtoken";

export async function requireAuth(req) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get("authorization"); 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized - No token provided", status: 401 };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return { error: "Unauthorized - Invalid token", status: 401 };
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded data is : ",decoded);
    // Attach user payload
    return { user: decoded };
  } catch (err) {
    console.error("Auth error:", err);
    return { error: "Unauthorized - Token invalid or expired", status: 403 };
  }
}
