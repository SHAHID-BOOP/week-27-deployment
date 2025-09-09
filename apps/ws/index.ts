import { prismaclient } from "db/client";

Bun.serve({
    port:8081,
    fetch(req,server) {
        if(server.upgrade(req)) {
            return;
        }
        return new Response("Upgrade failed", { status: 500});
    },
    websocket: {
        message(ws,message) {
            prismaclient.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message)
        },
    },
});