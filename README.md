# pic16f8x_emu
This is my personal implementation of an emulator for the PIC16F8X architecture.

## Features:
- Written in pure rust
- Multithreaded native frontend web application

## Used technologies
- [WebAssembly](https://webassembly.org/)
- [yew](https://yew.rs/)

### CPU Emulation:
- [PIC16F8X Datasheet (Private)](https://moodle.dhbw.de/pluginfile.php/95874/mod_resource/content/2/PIC16F8x.pdf)
- [PIC16F8X Handbook (Private)](https://moodle.dhbw.de/pluginfile.php/101988/mod_resource/content/2/Themenblatt_PIC_programmieren.pdf)

## Dependencies
- Rust Compiler (https://www.rust-lang.org/tools/install)
- Rust nightly toolchain (`rustup install nightly`)
- cargo-web (`cargo install cargo-web`) 

## Build & Run
### Link build output
```
$ cd static
static: $ ln -s ../target/wasm32-unknown-unknown/debug/pic16f8x_emu.js .
static: $ ln -s ../target/wasm32-unknown-unknown/debug/pic16f8x_emu.wasm .
```
#### Start
```
static: $ cd ..
$ cargo +nightly web start
```
