import { Request, Response } from "express";
import ConsultaEs from '../models/consultaEs'

export const getConsultas = async(req: Request, res:Response) =>{
    const listConsulta = await ConsultaEs.findAll();
    res.json(listConsulta);
}

export const getConsulta = async(req: Request,res: Response) =>{
    const { id } = req.params;
    const consult = await ConsultaEs.findByPk(id);
    if (consult){
        res.json(consult)

    }else{
        res.status(404).json({
            msg: 'no existe el id: ' + id    
        })
    }
    
}

export const deleteConsulta = async(req: Request,res: Response) =>{
    const { id } = req.params;
    const consult = await ConsultaEs.findByPk(id);
    if (consult){
        await consult.destroy();
        res.json({
            msg: 'la Consulta fue eliminada '
        })
    }else{
        res.status(404).json({
            msg: 'no existe el id: ' + id    
        })
    }
    
}

export const postConsulta = async(req: Request, res: Response) => {
    const {body} = req;
    try {
        await ConsultaEs.create(body);

        res.json({
            msg:'la consulta fue agregada'
        })    
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'ups, ha ocurrido un error'
        })
    }
    
}

export const putConsulta = async(req: Request, res: Response) => {
    const { id } = req.params;
    const {body} = req;
    const consult = await ConsultaEs.findByPk(id);
    try {
        if(consult){
            await consult.update(body);
            res.json({
                msg:'el producto fue actualizado con exito'
            })
        }else{
            res.status(404).json({
                msg: 'no existe el id: ' + id    
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'ups, ha ocurrido un error'
        })
    }
}