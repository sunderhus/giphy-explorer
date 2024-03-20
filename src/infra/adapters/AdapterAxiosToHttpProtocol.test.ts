import { describe, expect, it, vi } from 'vitest'
import {AdapterAxiosToHttpProtocol} from './AdapterAxiosToHttpProtocol'
import axios from 'axios'

const makeSut = ()=>{
    const sut =  new AdapterAxiosToHttpProtocol()
    const requestSpy = vi.spyOn(axios,'request')
    return{
        sut,
        requestSpy
    }
}

describe('AdapterAxiosToHttpProtocol',()=>{
    it('should call axios with correct params',async ()=>{
        const {sut, requestSpy} = makeSut()
        const mockTestUrl = 'fake-test-url'
        requestSpy.mockResolvedValueOnce({
            data:{apiStubData:'bar'},
            status:200
        })

        await sut.request({
            url: mockTestUrl,
            method: "GET"
        })

        expect(requestSpy).toHaveBeenCalledWith({
            url:mockTestUrl,
            method:'GET'
        })
    })

    it('should return correct response when request fails',()=>{
        const {sut, requestSpy} = makeSut()
        const mockTestUrl = 'fake-test-url'
        requestSpy.mockRejectedValueOnce({response:{
            data:{apiStubData:'bar'},
            status:589
        }})

        const result =  sut.request({
            url: mockTestUrl,
            method: "GET"
        })

        expect(result).resolves.toEqual({
            body: {
                apiStubData:'bar',
            },
            statusCode:589
        })

    })
})