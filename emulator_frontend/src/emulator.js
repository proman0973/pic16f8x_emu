import {memory} from "emulator_engine/emulator_engine_bg"
import {EmulatorEngine, SFRBank} from "emulator_engine"

const engine = EmulatorEngine.new()

function readEngineMem(bufferPtr, bufferSize) {
    return new Uint8Array(memory.buffer, bufferPtr, bufferSize)
}

engine.load_lst_file(`
                    00001           ;**********************************************************
                    00002           ;     SimTest01.SRC
                    00003           ;
                    00004           ;**********************************************************
                    00005             
                    00006           ;Das Programm initialisiert den Timer0 so, dass er bei jede
                    00007           ;erhoeht wird. Beim Ueberlauf von 255 auf 0 wird das T0IF-B
                    00008           ;aber nicht ausgeloest, weil das T0IE- und GIE-Bit nicht ge
                    00009           
                    00010           DEVICE    16F882
                    00011           CONFIG    RBPU_ON
                    00012           CONFIG    WDT_ON
                    00013           CONFIG    ANSEL
                    00014           CONFIG    ANSELH
                    00015           
                    00016           ; user defined symbols
                    00017           II         EQU       32
                    00018           JJ         EQU       33
                    00019           TEMP       EQU       34
                    00020           ZEIT       EQU       35
                    00021           TASTE1     EQU       7,4
                    00022           TASTE2     EQU       7,5
                    00023           TASTE3     EQU       5,4
                    00024           
                    00025           Option     EQU       1
                    00026           
                    00027           
                    00028           org     0
                    00029           
0000 2804           00030  $_COLD   goto      $_COLDX
0001 0000           00031           nop
0002 0000           00032           nop
0003 0000           00033           nop
                    00034  $_INTUP  
                    00035           ;          movwf     PUPOPW
                    00036           ;          swapf     status,w
                    00037           ;          clrf      status
                    00038           ;          movwf     PUPOPS
                    00039           ;          movf      FSR,w
                    00040           ;          movwf     PUPOPF
                    00041           ;          movf      PCLATH,w
                    00042           ;          movwf     PUPOPP
                    00043           ;          clrf      PCLATH
                    00044           ;          goto      $$CLK_U
                    00045           
                    00046  $_COLDX  
                    00047           
                    00048            
0004 0064           00049  START    clrwdt
0005 3001           00050           movlw     00000001B  ;TMR0 z?hlt durch den internen Befehls
0006 1683           00051           bsf       3,5                 ;auf BANK 1 umschalten, dort 
0007 0081           00052           movwf     1                   ;Register
0008 1283           00053           bcf       3,5
                    00054           
                    00055  loop     
0009 2809           00056           goto      loop
                    00057           
                    00058           end
`)

export {
    engine, readEngineMem
}
