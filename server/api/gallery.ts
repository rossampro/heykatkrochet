import { serverSupabaseClient } from '#supabase/server'
import { GalleryImage } from '~/types/gallery'
import { StorageError } from '@supabase/storage-js'

const BUCKET_NAME = 'images'

export default defineEventHandler(async (event): Promise<GalleryImage[]> => {
    const supabase = await serverSupabaseClient(event)
    
    try {
        const { data: files, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .list()

        if (error) {
            throw error
        }

        if (!files || files.length === 0) {
            return []
        }

        const images = await Promise.all(
            files.map(async (file): Promise<GalleryImage> => {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(file.name)

                return {
                    id: file.id,
                    url: publicUrl
                }
            })
        )

        return images
    } catch (error) {
        if (error instanceof StorageError) {
            throw createError({
                statusCode: 500,
                message: 'Failed to fetch images from storage'
            })
        }
        throw error
    }
}) 
