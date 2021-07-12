import { exec } from "child_process"
// - 1. Build typescript architecture
exec("lib/build-ts-arch.sh")
// - 2. Init typescript, eslint, git...
exec("lib/init-configs.sh")